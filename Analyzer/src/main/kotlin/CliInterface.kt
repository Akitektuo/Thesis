fun main(args: Array<String>) {
    val filePath = args.firstOrNull()
    if (filePath.isNullOrBlank())
        return

    println(Controller.processFile(filePath.trim(), if (args.size > 1) args[1].trim() else ""))
}