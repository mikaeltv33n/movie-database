// "use client"

// import { useState } from 'react';

// export default function useConfirmation() {
//     const [confirmationVisible, setConfirmationVisible] = useState(false);
//     const [confirmationMessage, setConfirmationMessage] = useState('');
//     const [confirmedAction, setConfirmedAction] = useState(() => () => {});
//     const [cancelledAction, setCancelledAction] = useState(() => () => {});

//     const confirm = (message, onConfirm, onCancel) => {
//         setConfirmationMessage(message);
//         setConfirmedAction(() => () => {
//             onConfirm();
//             setConfirmationVisible(false);
//         });
//         setCancelledAction(() => () => {
//             onCancel();
//             setConfirmationVisible(false);
//         });
//         setConfirmationVisible(true);
//     };

//     return {
//         confirm,
//         confirmationVisible,
//         confirmationMessage,
//         confirmedAction,
//         cancelledAction
//     };
// };

