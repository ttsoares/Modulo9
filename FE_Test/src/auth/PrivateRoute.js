import { Navigate, Route, Routes } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { useSelector } from 'react-redux';

export const PrivateRoute = props => {
    return <Routes><Route {...props} /></Routes>

    //buscar o tolen no LocalStorage
    const token = localStorage.getItem('token')

    // extrair o payload
    const {name } = jwt_decode(token);

    // buscar do Redux o 'name'

    const reduxName = useSelector(state => state.login.user.name)

    // verificar se o username é o mesmo do Redux

    if (name !== reduxName) return <Navigate to="/" replace />;

}