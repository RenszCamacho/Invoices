/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneInvoice } from '../../redux/actions/actionCreators';
import Header from '../Header';
import multiply from '../../services/multiply';
import currencyFormat from '../../services/currencyFormat';
import DeleteBtn from '../Buttons/DeleteBtn';
import RegularBtn from '../Buttons/RegularBtn';
import EditBtn from '../Buttons/EditBtn';
import './details.scss';

function Details({ match }) {
  const dispatch = useDispatch();
  const invoice = useSelector((store) => store.invoices);

  useEffect(() => {
    if (!invoice?.length) {
      dispatch(getOneInvoice());
    }
  }, [invoice]);

  const invoiceId = invoice.filter((one) => one._id === match.params.invoiceId)[0];
  return (
    <main className="details-container">
      <Header />

      <Link className="details-container__link" to="/">
        <em className="fas fa-chevron-left" />
        <span>Go Back</span>
      </Link>

      <div className="details-container__status">
        <p className="status__paragraph">Status</p>
        <div className="status__paid-status">
          <em className="fas fa-circle" />
          Pending
        </div>
      </div>

      <div className="details-container__body">
        <div className="body__project-description">
          #
          <span>
            {invoiceId._id
              .slice(-5)
              .toUpperCase()}
          </span>
          <h2>{invoiceId.projectDescription}</h2>
        </div>

        <address className="body__address-to">
          {invoiceId.from.address.street}
          <br />
          {invoiceId.from.address.city}
          <br />
          {invoiceId.from.address.postCode}
          <br />
          {invoiceId.from.address.country}
          <br />
        </address>

        <div className="body__invoice-date">
          <h3>Invoice Date</h3>
          <span>{invoiceId.invoiceDate}</span>
        </div>

        <div className="body__payment-due">
          <h3>Paymet Due</h3>
          <span>{invoiceId.paymentTerms}</span>
        </div>

        <div className="body__sent-to">
          <h3>Sent to</h3>
          <span>{invoiceId.to.email}</span>
        </div>

        <address className="body__address-from">
          <p>Bill to</p>
          <h3>{invoiceId.to.name}</h3>
          {invoiceId.to.address.street}
          <br />
          {invoiceId.to.address.city}
          <br />
          {invoiceId.to.address.postCode}
          <br />
          {invoiceId.to.address.country}
          <br />
        </address>

        <ul className="body__list">
          {
                invoiceId.items.map(
                  (item) => (
                    <li className="list__item-details" key={`${item._id}A`}>
                      <div className="item-details__container">
                        <h3>{item.productName}</h3>
                        <span>{`${item.quantity}x ${currencyFormat(item.price)}`}</span>
                      </div>
                      <p className="item-details__total">{currencyFormat(multiply(item.price, item.quantity))}</p>
                    </li>
                  )
                )
              }
          <div className="list__total">
            <p>Grand Total</p>
            <p>{currencyFormat(invoiceId.total)}</p>
          </div>
        </ul>

      </div>
      <div className="details-container__btn">
        <EditBtn nameBtn="Edit" />
        <DeleteBtn nameBtn="Delete" />
        <RegularBtn nameBtn="Mark as Paid" />
      </div>
    </main>
  );
}

export default Details;