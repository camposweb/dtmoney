import Modal from 'react-modal';
import closeImg from '../../assets/button-close.svg';
import incomeImg from '../../assets/arrow-positive.svg';
import outcomeImg from '../../assets/arrow-negative.svg';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import { FormEvent, useState, useContext } from 'react';
import { useTransactions } from '../../hooks/useTransactions';


interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps){
   
    const { createTransaction } = useTransactions();

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('')
    const [type, setType] = useState('deposit');

    function reset(){
        setTitle('');
        setAmount(0);
        setCategory('');
        setType('');
    }

   async function handleCreateNewTransaction(event: FormEvent) {
       event.preventDefault();

       await createTransaction({
           title,
           amount,
           category,
           type
       })

       reset();
       onRequestClose();
   }
    
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content" >
            
            <button type="button"
                    onClick={onRequestClose}
                    className="react-modal-close">
                <img src={closeImg} alt="Fechar modal" />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>
                
                <input 
                placeholder="Título"
                value={title}
                onChange={event => setTitle(event.target.value)} />

                <input 
                type="number"
                placeholder="Valor"
                value={amount}
                onChange={event => setAmount(Number(event.target.value))} />

                <TransactionTypeContainer>
                    <RadioBox type="button"
                            onClick={() => { setType('deposit'); }}
                            isActive={type === 'deposit'}
                            activeColor="green">
                        <img src={incomeImg} alt="entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox type="button"
                            onClick={() => { setType('withdraw'); }}
                            isActive={type === 'withdraw'}
                            activeColor="red">
                        <img src={outcomeImg} alt="saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input 
                placeholder="Categoria"
                value={category}
                onChange={event => setCategory(event.target.value)} />

                <button type="submit">Cadastrar</button>
                
            </Container>
        </Modal>
    )
}