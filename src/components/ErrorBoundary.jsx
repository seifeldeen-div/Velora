import { Component } from 'react'
import ErrorFallback from './ErrorFallback.jsx'

class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error(error, info)
  }

  render() {
    return this.state.hasError ? <ErrorFallback /> : this.props.children
  }
}

export default ErrorBoundary
