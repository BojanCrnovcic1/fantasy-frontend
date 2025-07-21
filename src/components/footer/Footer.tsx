import './footer.scss';

const Footer = () => {
    const authorUrl = import.meta.env.VITE_AUTHOR_URL;

  return (
    <div className='footer'>
        <div className='footer-top'>
            <h3>Predictions Premier League 2025</h3>
            <p>Donirajte neki dinar za razvoj aplikacije. Ne budite Čifuti!</p>
        </div>
        <div className='footer-bottom'>
        <p>&copy; {new Date().getFullYear()} Fantasy. Sva prava zadržana.</p>
        <p className='author-signature'>
          <a href={authorUrl} target='_blank' rel='noopener noreferrer'>BojanC</a>
        </p>
      </div>
    </div>
  )
}

export default Footer