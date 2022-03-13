import {Spin} from 'antd'

export const Loader = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Spin size='large' />
        </div>
    )
}
