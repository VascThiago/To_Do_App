//Aqui estão as actions creators
import axios from 'axios'

const URL = 'http://localhost:3003/api/todos'

//pegar valor da descrição
export const changeDescription = (event) => ({
    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value
})

//pesquisar e atualizar
export const search = (description) => {
    const search = description ? `&description__regex=/${description}/` : ''
    const request = axios.get(`${URL}?sort=-createdAt${search}`)
    return {
        type: 'TODO_SEARCHED',
        payload: request
    }
}

//limpar formulario
export const clear = () => {
    return {
        type: 'TODO_CLEAR'
    }
}

//usando thunk e multi e disparando adicionar e pesquisar juntos porém ordenados
//adicionar e atualizar a lista
export const add = (description) => {
    return dispatch => {
        axios.post(URL, { description })
            .then(resp => dispatch(clear()))
            .then(resp => dispatch(search()))
    }
}

//marcar como feito
export const markAsDone = (todo) => {
    return dispatch => {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
            .then(resp => dispatch({ type: 'TODO_MARKED_AS_DONE', payload: resp.data}))
            .then(resp => dispatch(search()))
    }
}

//marcar como não feito
export const markAsPending = (todo) => {
    return dispatch => {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
            .then(resp => dispatch({ type: 'TODO_MARKED_AS_PENDING', payload: resp.data}))
            .then(resp => dispatch(search()))
    }
}

//excluir
export const remove = (todo) => {
    return dispatch => {
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => dispatch({ type: 'TODO_DELETE', payload: resp.data}))
            .then(resp => dispatch(search()))
    }
}