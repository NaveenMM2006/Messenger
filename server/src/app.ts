import express from 'express'
import cors from 'cors'

import prisma from './config/prisma'
import authRoutes from './modules/auth/routes/auth.routes'
import userRoutes from "./modules/users/routes/user.routes";
import workspaceRoutes from "./modules/workspace/routes/workspace.routes";
import channelRoutes from "./modules/channels/routes/channel.routes";
import messageRoutes from "./modules/messages/routes/message.routes";


import { errorHandler } from "./middlewares/error.middleware";
const app = express()

app.use(cors())
app.use(express.json())
app.use(errorHandler)

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/channels', channelRoutes);
app.use("/api/messages", messageRoutes);

app.get('/', async (_req, res) => {

  const users = await prisma.user.findMany()

  res.json({
    message: 'API Running 🚀',
    users,
  })

})

export default app