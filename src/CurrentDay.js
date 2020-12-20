function CurrentDay() {
    let currentDate = new Date();
    return (
        <div>
            <h3>Today is:</h3>
            <h2>{currentDate.toDateString()}</h2>
        </div>
    )
}

export default CurrentDay;