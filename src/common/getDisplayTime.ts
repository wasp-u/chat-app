export const getDisplayTime = (milliseconds: number) => {
    const sendTime = new Date(milliseconds)
    const time = sendTime.toString().split(' ')[4].split(':')
    const displayTime = time[0] + ':' + time[1]

    return displayTime
}
