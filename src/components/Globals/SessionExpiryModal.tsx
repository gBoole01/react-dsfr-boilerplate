import useSessionExpiry from '@src/hooks/useSessionExpiry';

function SessionExpiryModal() {
    const { sessionExpiryModal, handleKeepAlive, handleDisconnect } =
        useSessionExpiry();
    return (
        <sessionExpiryModal.Component
            title="Vous êtes sur le point d'être déconnecté"
            buttons={[
                {
                    iconId: 'fr-icon-checkbox-circle-line',
                    onClick: handleKeepAlive,
                    children: 'Rester connecté',
                },
                {
                    iconId: 'fr-icon-logout-box-r-line',
                    onClick: handleDisconnect,
                    children: 'Se déconnecter',
                },
            ]}
        >
            <p>
                Vous allez être déconnecté dans moins de 5 minutes en raison
                d'inactivité. Pour rester connecté, cliquez sur "Rester
                connecté".
            </p>
        </sessionExpiryModal.Component>
    );
}

export default SessionExpiryModal;
