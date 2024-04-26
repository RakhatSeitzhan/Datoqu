'use client'
import React from 'react'
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

function Practice() {
    const str = "Assume that there is an intergral given in the form $$ \\int_{a}^{b} \\zeta^2 + \\mu_5 dx $$. Let $$ \\mu $$ be equal to 10 and find the corresponding value for the intergral"
    return (
    <div>
        <h2>Practice</h2>
        <Latex>{str}</Latex>
    </div>
  )
}

export default Practice
