import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'shards-react';

import './SavedGames.scss';

const curDate = new Intl.DateTimeFormat('default', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true,
}).format(new Date(Date.now()));

const games = [
  {
    saveName: '1',
    userName: 'Jeremy',
    date: curDate,
  },
  {
    saveName: '2',
    userName: 'Jeremy',
    date: curDate,
  },
  {
    saveName: '3',
    userName: 'Jeremy',
    date: curDate,
  },
];

export default function BasicModalExample() {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className='h-100'>
      <Button className='navBar' onClick={toggle}>
        Manage Games
      </Button>
      <Modal open={open} toggle={toggle}>
        <ModalHeader>
          Saved Games
          <Button>Save Game</Button>
        </ModalHeader>
        <ModalBody className='pt-2 px-3'>
          {games.map((game) => (
            <div
              key={game.saveName}
              className='position-relative save-container'
            >
              <div className='text-left mb-2 bg-primary p-3 save-styling rounded'>
                <h6 className='mb-0 text-light'>{`Save Name: ${game.saveName}`}</h6>
                <h6 className='mb-0 text-light'>{`User Name: ${game.userName}`}</h6>
                <h6 className='mb-0 text-light'>{`Date Saved: ${game.date}`}</h6>
              </div>
              <Button className='hide-hover'>Load</Button>
              <Button className='hide-hover'>Delete</Button>
            </div>
          ))}
          <nav aria-label='Page navigation example'>
            <ul className='pagination justify-content-center'>
              <li className='page-item'>
                <a className='page-link' href='#' aria-label='Previous'>
                  <span aria-hidden='true'>&laquo;</span>
                </a>
              </li>
              <li className='page-item'>
                <a className='page-link' href='?saves=1'>
                  1
                </a>
              </li>
              <li className='page-item'>
                <a className='page-link' href='?saves=2'>
                  2
                </a>
              </li>
              <li className='page-item'>
                <a className='page-link' href='?saves=3'>
                  3
                </a>
              </li>
              <li className='page-item'>
                <a className='page-link' href='#' aria-label='Next'>
                  <span aria-hidden='true'>&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </ModalBody>
      </Modal>
    </div>
  );
}