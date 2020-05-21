import React, { Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import { Helmet } from 'react-helmet'
import Loader from 'components/LayoutComponents/Loader'
import DefaultLayout from './Default'
import Clean from './Clean'
import PublicLayout from './Public'
import LoginLayout from './Login'
import MainLayout from './Main'
import { routes } from '../routes'

const Layouts = {
  default: DefaultLayout,
  public: PublicLayout,
  login: LoginLayout,
  main: MainLayout,
  clean: Clean
}

@withRouter
@connect(({ user }) => ({ user }))
class IndexLayout extends React.PureComponent {
  previousPath = ''

  componentDidUpdate(prevProps) {
    const { location } = this.props
    const { prevLocation } = prevProps
    if (location !== prevLocation) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    const {
      children,
      location: { pathname, search },
      user,
    } = this.props

    // NProgress Management
    const currentPath = pathname + search
    if (currentPath !== this.previousPath) {
      NProgress.start()
    }

    setTimeout(() => {
      NProgress.done()
      this.previousPath = currentPath
    }, 300)

    // Layout Rendering
    const getLayout = () => {
      for(let i = 0; i < routes.length; i += 1){
        if(routes[i].path === pathname){
          if(routes[i].layout) return routes[i].layout;
          return 'default';
        }
      }
      return 'public';
    }

    const isPrivate = () => {
      for(let i = 0; i < routes.length; i += 1){
        if(routes[i].path === pathname){
          if(routes[i].private) return true;
          return false;
        }
      }
      return false;
    }

    const isPrivatePage = isPrivate()
    const isUserAuthorized = user.authorized
    const isUserLoading = user.loading
    const isLoginLayout = getLayout() === 'login'
    const Container = isUserAuthorized || isLoginLayout ? Layouts[getLayout()] : Layouts.public

    const BootstrappedLayout = () => {
      // show loader when user in check authorization process, not authorized yet and not on login pages
      if (isUserLoading && !isUserAuthorized && !isLoginLayout) {
        return <Loader />
      }
      // redirect to login page if current is not login page and user not authorized
      if (!isLoginLayout && !isUserAuthorized && isPrivatePage) {
        return <Redirect to="/user/login" />
      }
      // redirect to main dashboard when user on login page and authorized
      if (isLoginLayout && isUserAuthorized) {
        return <Redirect to="/" />
      }
      // in other case render previously set layout
      return <Container>{children}</Container>
    }

    return (
      <Fragment>
        <Helmet titleTemplate="Bilerman | %s" title="Your personal Blog" />
        {BootstrappedLayout()}
      </Fragment>
    )
  }
}

export default IndexLayout
