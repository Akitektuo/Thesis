import java.io.File

class Parser(private val analysisTree: AnalysisTree, private val solutionDirectory: File) {
    private val classRegex = Regex("(((public)?\\s+)|\\b*)class\\s+[A-Z\\d]\\w*\\s*\\{.*}\\s*")
    private val mainRegex = Regex(
        "\\s*public\\s+static\\s+void\\s+main\\s*\\(\\s*String\\s*\\[\\s*]\\s+\\w+\\s*\\)\\s*\\{.*}\\s*"
    )

    fun parseFileContents() = solutionDirectory.walkTopDown()
        .filter { it.extension == "java" }
        .forEach { processFileContent(it.readText()) }

    private fun processFileContent(content: String) {
        if (classRegex.matches(content))
            throw Exception("No class was found")
        if (mainRegex.matches(content))
            throw Exception("No main starting method was found")

        analysisTree.content = content
    }
}