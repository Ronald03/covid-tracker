import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';

function InfoBox({ title, cases, totals }) {
    return (
        <div>
            <Card>
                <CardContent>
                    {/* Title 'Coronavirus cases */}
                    <Typography className="infoBox__title" color="textSecondary">
                        {title}
                    </Typography>
                    {/* Numbver of Cases */}
                    <h2 className="infoBox__cases">{cases}</h2>
                    {/* 1.2M Total */}
                    <Typography className="totals" color="textSecondary">
                        {totals}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default InfoBox
