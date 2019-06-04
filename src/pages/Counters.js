import React from 'react';
import CounterClass from "../playground/CounterClass";
import CounterFunctional from "../playground/CounterFunctional";

function Counters() {
    return (
        <div>
            <CounterClass/>
            <CounterFunctional/>
        </div>
    );
}

export default Counters;
