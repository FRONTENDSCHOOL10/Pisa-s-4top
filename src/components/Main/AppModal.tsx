import Modal from 'react-modal';
import { Button } from '../Buttons/Buttons';

interface Props {
   content: string;
   subContent?: string;
   isOpen: boolean;
   onRequestClose: () => void;
   onConfirm: () => void;
   showMessage?: boolean;
   [props: string]: any;
}

const customStyles: Modal.Styles = {
   overlay: {
      backgroundColor: ' rgba(0, 0, 0, 0.4)',
      width: '100%',
      height: '100dvh',
      zIndex: '9999',
      position: 'fixed',
   },
   content: {
      width: '400px',
      height: '200px',
      zIndex: '150',
      position: 'absolute',
      gap: '8px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
      backgroundColor: 'white',
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'center',
      alignItems: 'center',
   },
};

export default function AppModal({
   isOpen,
   onRequestClose,
   onConfirm,
   content,
   subContent,
   showMessage = false,
   ...restProps
}: Props) {
   return (
      <Modal
         isOpen={isOpen}
         onRequestClose={onRequestClose}
         contentLabel="Example Modal"
         shouldCloseOnOverlayClick={false}
         style={customStyles}
         {...restProps}
      >
         <p className="text-lg font-bold">{content}</p>
         {showMessage ? <p>{subContent}</p> : ''}

         <div className="mt-5 flex w-full flex-row gap-4">
            <Button
               content="취소"
               type="button"
               isError={true}
               size="fullWidth"
               handleClick={onRequestClose}
            />
            <Button
               content="확인"
               type="button"
               size="fullWidth"
               handleClick={onConfirm}
            />
         </div>
      </Modal>
   );
}
