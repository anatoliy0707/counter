
export type IdentifierType = "START" | "MAX"

export const isValueCorrect = ( value: number, settingValue: number, identifier: IdentifierType) => {
    switch (identifier) {
        case "START":
            return (value >= 0 && value < settingValue)
        case "MAX":
            return (value > settingValue )
    }
}

