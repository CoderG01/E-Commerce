import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Succes = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 4000)
    }, [])

    return (
        <div>Succes</div>
    )
}
