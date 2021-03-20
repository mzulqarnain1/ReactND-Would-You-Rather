import React from 'react';
import { Link } from 'react-router-dom';

export const QuestionNotFound = () => (
    <div className='center'>
        <h1>No Such Question Found!</h1>
        <Link className='btn' to="/">
            Go Home
        </Link>
    </div>
);

export const PageNotFound = () => (
    <div className='center'>
        <h1>404 - Page Not Found!</h1>
        <Link className='btn' to="/">
            Go Home
        </Link>
    </div>
);
