class Analyzer(private val analysisTree: AnalysisTree, private val rule: RuleLoader) {
    fun runAnalysis(): ArrayList<String> = when (rule) {
        RuleLoader.OBJECTS -> runObjectsAnalysis()
        RuleLoader.OBJECT_METHODS -> runObjectMethodsAnalysis()
        else -> runNoClassesAnalysis()
    }

    private fun runObjectsAnalysis(): ArrayList<String> {
        return arrayListOf()
    }

    private fun runObjectMethodsAnalysis(): ArrayList<String> {
        return arrayListOf()
    }

    private fun runNoClassesAnalysis(): ArrayList<String> {
        val functionDeclarationRegex =
            Regex("\\s+static void \\w+\\((int|Integer)\\[] \\w+, (int|Integer) \\w+, (int|Integer) \\w+, (int|Integer) \\w+\\)\\s*\\{(\\s|.)*?}")
        val listAccessorRegex = Regex("\\s+\\w+\\[\\w+]")
        val additionRegex = Regex("\\+")
        val subtractionRegex = Regex("-")
        val assignmentRegex = Regex("\\s+\\w+\\[\\w+]\\s*[+\\-]?\\s*=\\s*\\w+")

        val functionBlock = functionDeclarationRegex.find(analysisTree.content)
            ?: return arrayListOf("The expected function declaration is missing, remember not to modify the order of the parameters.")

        val result = arrayListOf<String>()
        if (!listAccessorRegex.containsMatchIn(functionBlock.value))
            result.add("The given list is not modified, thus the printed result will similar to the initial value.")
        if (!additionRegex.containsMatchIn(functionBlock.value))
            result.add("The transferred sum will not be added into the destination account.")
        if (!subtractionRegex.containsMatchIn(functionBlock.value))
            result.add("The transferred sum will not be removed from the source account.")
        if (!assignmentRegex.containsMatchIn(functionBlock.value))
            result.add("The transferred sum will not be visible.")

        return result
    }
}