fun main(args: Array<String>) {
    val text = args.firstOrNull() ?: ""
    println("Text length: ${text.length}")
}