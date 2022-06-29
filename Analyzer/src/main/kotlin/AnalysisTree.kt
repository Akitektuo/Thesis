data class AnalysisTree(var content: String = "", val program: StartComponent = StartComponent())

interface Component

enum class VisibilityModifier {
    PRIVATE,
    PROTECTED,
    PUBLIC
}

interface BehaviourComponent : Component

interface FinalComponent : BehaviourComponent {
    val isFinalModifier: Boolean
}

interface StaticComponent : BehaviourComponent {
    val isStaticModifier: Boolean
}

interface AbstractComponent : BehaviourComponent {
    val isAbstractModifier: Boolean
}

interface VisibilityComponent : Component {
    val visibilityModifier: VisibilityModifier
}

interface TypeComponent : Component {
    val defaultValue: String
}

class VoidTypeComponent : TypeComponent {
    override val defaultValue = ""
}

class StringTypeComponent : TypeComponent {
    override val defaultValue = ""
}

data class ArrayTypeComponent(val innerType: TypeComponent) : TypeComponent {
    override val defaultValue = "null"
}

class StartComponent : Component {
    val arguments = arrayListOf<String>()
    var mainClass: ClassComponent? = null

    fun getEntryPoint() = mainClass?.methods?.find {
        it.visibilityModifier == VisibilityModifier.PUBLIC &&
                it.isStaticModifier &&
                it.returnType is VoidTypeComponent &&
                it.name == "main" &&
                it.parameters.size == 1 &&
                it.parameters.first().value.type is ArrayTypeComponent &&
                (it.parameters.first().value.type as ArrayTypeComponent).innerType is StringTypeComponent
    }
}

data class ClassConstructorComponent(
    override val visibilityModifier: VisibilityModifier = VisibilityModifier.PROTECTED
) : VisibilityComponent {
    companion object {
        fun getDefault(classVisibilityModifier: VisibilityModifier) = ClassConstructorComponent(classVisibilityModifier)
    }
}

class CompoundStatementComponent : Component

data class ValueComponent(val type: TypeComponent, val value: String = type.defaultValue)

data class ParameterComponent(val name: String, val value: ValueComponent)

abstract class ClassMemberComponent(
    override val visibilityModifier: VisibilityModifier,
    override val isFinalModifier: Boolean,
    override val isStaticModifier: Boolean
) : VisibilityComponent, FinalComponent, StaticComponent

class PropertyComponent(
    val name: String,
    val value: ValueComponent,
    visibilityModifier: VisibilityModifier,
    isFinalModifier: Boolean,
    isStaticModifier: Boolean
) : ClassMemberComponent(visibilityModifier, isFinalModifier, isStaticModifier)

class MethodComponent(
    val name: String,
    val returnType: TypeComponent = VoidTypeComponent(),
    val parameters: ArrayList<ParameterComponent> = arrayListOf(),
    val body: CompoundStatementComponent,
    visibilityModifier: VisibilityModifier,
    isFinalModifier: Boolean,
    isStaticModifier: Boolean
) : ClassMemberComponent(visibilityModifier, isFinalModifier, isStaticModifier)

abstract class TypeClassComponent(
    val name: String,
    override val visibilityModifier: VisibilityModifier = VisibilityModifier.PROTECTED,
    val constructors: ArrayList<ClassConstructorComponent> = arrayListOf(
        ClassConstructorComponent.getDefault(
            visibilityModifier
        )
    ),
    override val isAbstractModifier: Boolean,
    val properties: ArrayList<PropertyComponent> = arrayListOf(),
    val methods: ArrayList<MethodComponent> = arrayListOf()
) : VisibilityComponent, AbstractComponent, TypeComponent {
    override val defaultValue = "null"
}

class ClassComponent(
    name: String,
    visibilityModifier: VisibilityModifier = VisibilityModifier.PROTECTED,
    constructors: ArrayList<ClassConstructorComponent> = arrayListOf(
        ClassConstructorComponent.getDefault(
            visibilityModifier
        )
    ), isAbstractModifier: Boolean
) : TypeClassComponent(name, visibilityModifier, constructors, isAbstractModifier) {
}