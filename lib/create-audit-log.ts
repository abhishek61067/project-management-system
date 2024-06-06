import { auth, currentUser } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { db } from './db'

interface Props {
  entityId: string
  entityType: ENTITY_TYPE
  entityTitle: string
  action: ACTION
}

export const createAuditLog = async (props: Props) => {
  try {
    console.log('inside of createAuditLog ')
    const { orgId } = auth()
    const user = await currentUser()

    console.log('!!!!!!!!!!!!!user: ', user)

    if (!user || !orgId) {
      throw new Error('user not found')
    }

    const { entityId, entityType, entityTitle, action } = props

    await db.auditLog.create({
      data: {
        orgId,
        entityId,
        entityType,
        entityTitle,
        action,
        userId: user?.id ?? '',
        userImage: user?.imageUrl ?? '',
        userName: user?.firstName + ' ' + user?.lastName,
      },
    })
  } catch (e) {
    console.error('audit log error: ', e)
  }
}
