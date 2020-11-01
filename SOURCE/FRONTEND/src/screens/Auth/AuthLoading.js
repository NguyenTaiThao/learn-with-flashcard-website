import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class AuthLoading extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
           <h1>Loading Screen</h1>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading)
