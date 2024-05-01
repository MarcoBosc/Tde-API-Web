import User from '../models/user.js'

export const getUsers = async () => {
    const user = await User.find()
    return user
}

export const getUser = async (id) => {
    const user = User.findById(id)
    return user
}

const validateUserEmail = (email) => {
    return email.includes('@')
}

function isValidCPF(cpf) {
    if (typeof cpf !== "string") return false
    cpf = cpf.replace(/[\s.-]*/igm, '')
    if (
        !cpf ||
        cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999" 
    ) {
        return false
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++) 
        soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(9, 10)) ) return false
    soma = 0
    for (var i = 1; i <= 10; i++) 
        soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(10, 11) ) ) return false
    return true
}

const validateUserCPF = (cpf) => {
    return isValidCPF(cpf)
}

const sendUserParams = async (user) => {
    await user.save()
    return user
}

export const createUser = async (params) => {

    if(!validateUserEmail(params.email)) {
        return { error: "Email inválido." }
    } else if (!validateUserCPF(params.cpf)){
        return { error: "CPF inválido." }
    }

    const user = new User({
        nome: params.nome,
        email: params.email,
        idade: params.idade,
        genero: params.genero,
        telefone: params.telefone,
        cpf: params.cpf,
        rg: params.rg
    })
    return sendUserParams(user)

}

export const deleteUser = async (id) => {
    await User.findByIdAndDelete(id)
}

export const updateUser = async (id, params) => {

    if(!validateUserEmail(params.email)) {
        return { error: "Email inválido." }
    } else if (!validateUserCPF(params.cpf)){
        return { error: "CPF inválido." }
    }

    const user = await User.findByIdAndUpdate(id, {
        nome: params.nome,
        email: params.email,
        idade: params.idade,
        genero: params.genero,
        telefone: params.telefone,
        cpf: params.cpf,
        rg: params.rg
    }, {
        new: true
    })
    return user
}
