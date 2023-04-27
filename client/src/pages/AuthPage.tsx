import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateMenuStatus } from "../redux/slices/app/appSlice";
import { login, register } from "../redux/slices/user/userSlice";
import { RootState } from "../redux/store";

const AuthPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateMenuStatus("show"));
    }, []);
    return (
        <div className="flex justify-center items-center w-full h-[calc(100vh-80px)]">
            <div className="flex flex-col justify-center items-center gap-2  rounded-md bg-white shadow-xl p-4 py-6 w-[500px] min-h-[500px]">
                <h3 className="text-2xl font-semibold ">Đăng nhập</h3>
                <LoginFrom></LoginFrom>
                <div className="text-center font-medium text-gray-500 my-2">
                    Hoặc
                </div>
                <RegisterForm></RegisterForm>
            </div>
        </div>
    );
};

const LoginFrom = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { error, _id } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const navigation = useNavigate();
    useEffect(() => {
        if (!error && _id) {
            navigation("/");
        }
    }, [error, _id]);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) return;
        dispatch(
            login({
                email: email,
                password: password,
            })
        );
    };

    return (
        <form
            onSubmit={handleLogin}
            className="flex flex-col gap-3 justify-start items-center"
        >
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                required
                className="outline-blue-500 bg-transparent px-4 py-3 text-lg border-gray-300 border"
            />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="outline-blue-500 bg-transparent px-4 py-3 text-lg border-gray-300 border"
                type="password"
                placeholder="Mật khẩu"
                required
            />
            <button
                type="submit"
                disabled={!email.trim() || !password.trim()}
                className="disabled:bg-gray-200 disabled:text-gray-500 w-full bg-blue-500 text-white font-semibold px-2 py-2 rounded-md"
            >
                Đăng nhập
            </button>
        </form>
    );
};

const RegisterForm = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userName.trim() || !email.trim() || !password.trim()) return;
        dispatch(
            register({
                userName,
                email,
                password,
            })
        );
    };

    return (
        <form
            onSubmit={handleRegister}
            className="flex flex-col justify-start items-center gap-3"
        >
            <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="outline-blue-500 bg-transparent px-4 py-3 text-lg border-gray-300 border"
                type="text"
                placeholder="Tên người dùng"
                autoComplete="off"
                required
            />
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="outline-blue-500 bg-transparent px-4 py-3 text-lg border-gray-300 border"
                type="email"
                placeholder="Email"
                autoComplete="off"
                required
            />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="outline-blue-500 bg-transparent px-4 py-3 text-lg border-gray-300 border"
                type="password"
                placeholder="Mật khẩu"
                autoComplete="off"
                required
            />
            <button
                type="submit"
                disabled={!email.trim() || !password.trim() || !userName.trim()}
                className="disabled:bg-gray-200 disabled:text-gray-500 w-full bg-blue-500 text-white font-semibold px-2 py-2 rounded-md"
            >
                Đăng ký
            </button>
        </form>
    );
};

export default AuthPage;
