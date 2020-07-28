import React, { useState, useEffect } from 'react'

function LineGraph() {
    // https://disease.sh/v3/covid-19/historical/all?lastdays=120

    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                });
        };
        fetchData();
    }, [])

    return (
        <div>
            <h2> A graph here!</h2>
        </div>
    )
}

export default LineGraph
