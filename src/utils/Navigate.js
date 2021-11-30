import React, { useEffect } from "react";
import { useNavigate } from "react-router";

export default (to) => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(to);

    }, []);

    return null;
};