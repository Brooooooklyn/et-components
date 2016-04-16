'use strict'
import {componments} from '../../src/component'
import {UserAPI, UserMe} from 'teambition-sdk'
import {ChangeTitle} from './change_title'

const navigation = require('./layout.html')

@componments({
  template: navigation,
  selector: 'root-componment',
  injectable: [UserAPI],
  childNodes: [ChangeTitle]
})
export class UserComponment {

  userMe: UserMe = <any>{}

  constructor(private user: UserAPI) {}

  onInit() {
    return this.user.getUserMe().then((userMe) => {
      this.userMe = userMe
    })
  }
}
