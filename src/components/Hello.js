import React, { Component } from 'react'

import './hello.css'
// 上面是ES6的导包, 下面是CommonJs的导包
// require('./hello.css')
import './hello.scss'

export default class Hello extends Component{
	render() {
		return (
			<div>
				<p>
					Hello World
				</p>
				<img/>
			</div>			
		)
	}
}