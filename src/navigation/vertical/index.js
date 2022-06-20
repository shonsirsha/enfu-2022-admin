// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      sectionTitle: 'Pendaftar Event'
    },
    {
      title: 'DBCC',
      icon: AccountPlusOutline,
      path: '/dbcc'
    },
    {
      title: 'Seminar Nasional',
      icon: AccountPlusOutline,
      path: '/seminar-nasional'
    },
    {
      title: 'Coaching Clinic',
      icon: AccountPlusOutline,
      path: '/coaching-clinic'
    },
    {
      title: 'Coaching Session',
      icon: AccountPlusOutline,
      path: '/coaching-session'
    },
    {
      title: 'Sharing Session',
      icon: AccountPlusOutline,
      path: '/sharing-session'
    },
    {
      title: 'Subscribers',
      icon: AccountPlusOutline,
      path: '/subscribers'
    },
    {
      sectionTitle: 'Website'
    },
    {
      title: 'Open/Close Regist',
      icon: LockOpenOutline,
      path: '/registrations'
    },
    {
      title: 'Referral Codes',
      path: '/referral-codes',
      icon: CreditCardOutline
    }
  ]
}

export default navigation
