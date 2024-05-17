function Spinner() {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
            }}
        >
            <img src="/spinner.gif" width={100} height={100} />
        </div>
    );
}

export default Spinner;
