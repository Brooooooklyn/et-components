'use strict'
import {componments} from '../src/component'
import {UserComponment} from './userme/user_componment'
import {OrgComponment} from './orgs/org_componment'
import {Fetch} from 'teambition-sdk'
import {bootstrap} from '../src/bootstrap'

Fetch.setAPIHost('http://project.ci/api')

@componments({
  template: require('./root.html'),
  selector: 'main-app',
  childNodes: [OrgComponment, UserComponment]
})
class App {}

bootstrap(App)
