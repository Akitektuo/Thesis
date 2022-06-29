import java.io.File
import java.io.InputStream
import java.nio.file.Files
import java.util.zip.ZipEntry
import java.util.zip.ZipFile

class Controller {
    companion object {
        fun processFile(filePath: String, ruleId: String): String = Controller().let {
            it.unzipArchive(filePath)
            val result = it.processProject(ruleId)
            it.cleanup()

            result
        }
    }

    private val tempDirectory = Files.createTempDirectory("tempAnalyzer").toFile().apply {
        deleteOnExit()
    }

    private fun unzipArchive(filePath: String) = ZipFile(filePath).use { zipFile ->
        zipFile.entries().asSequence().forEach { zipEntry ->
            zipFile.getInputStream(zipEntry).use { createFileFromZipEntry(tempDirectory, zipEntry, it) }
        }
    }

    private fun processProject(ruleId: String): String {
        val rule = try {
            RuleLoader.valueOf(ruleId)
        } catch (ex: IllegalArgumentException) {
            RuleLoader.NO_CLASSES
        }

        val analysisTree = AnalysisTree()
        val parser = Parser(analysisTree, tempDirectory)
        val analyzer = Analyzer(analysisTree, rule)

        parser.parseFileContents()

        return analyzer.runAnalysis().joinToString("\n")
    }

    private fun createFileFromZipEntry(basePath: File, zipEntry: ZipEntry, inputStream: InputStream) {
        val outputFile = File(basePath, zipEntry.name)

        outputFile.parentFile.mkdirs()

        if (zipEntry.isDirectory)
            return
        if (!outputFile.exists())
            outputFile.createNewFile()

        outputFile.outputStream()
            .use { inputStream.transferTo(it) }
    }

    private fun cleanup() = tempDirectory.deleteRecursively()
}