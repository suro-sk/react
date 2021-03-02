import React from "react";
import ShowCount from "./ShowCount";
import SetCount from "./SetCount";

export default function Counter() {
    return (
        <div className="text-center">
            <h1 className="text-center mb-5">Counter</h1>
            <ShowCount/>
            <SetCount/>
        </div>
    )
}