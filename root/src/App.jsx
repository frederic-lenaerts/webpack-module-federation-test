import React from 'react'
import ModuleA from 'module-a/ModuleA'
import ModuleB from 'module-b/ModuleB'

export default function App() {
    return <>
        <p>Root</p>
        <ModuleA />
        <ModuleB />
    </>
}