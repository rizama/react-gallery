import React from 'react'

const Jumbo = () => {
    return (
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-lg">Search Album</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                </div>
            </div>
        </div>
    )
}

export default Jumbo
