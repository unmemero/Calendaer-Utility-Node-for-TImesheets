import React from "react";

let api_key = "my_secret_key";

export default function Calendar() {
    return (
        <header>
            <h1>Timesheet information</h1>
            <p>API Key: {api_key}</p>
            <nav>
                <Link></Link>
            </nav>
        </header>
    );
}