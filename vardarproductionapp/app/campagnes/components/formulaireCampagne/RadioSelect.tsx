import React from 'react'

export default function RadioSelect() {
    return (
        <div className="flex flex-col space-y-2">
            <label className="flex items-center">
                <input
                    type="radio"
                    name="option"
                    value="option1"
                    className="form-radio text-blue-600"
                />
                <span className="ml-2">Oui</span>
            </label>
            <label className="flex items-center">
                <input
                    type="radio"
                    name="option"
                    value="option2"
                    className="form-radio text-blue-600"
                />
                <span className="ml-2">Non</span>
            </label>
        </div>
    )
}
