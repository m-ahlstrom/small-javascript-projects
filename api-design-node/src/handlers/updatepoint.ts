import prisma from "../modules/db"

export const getUpdatePoint = async (req, res) => {
    const updatePoint = await prisma.updatePoint.findUnique({
        where: {
            id: req.params.id
        }
    })

    res.json({ data: updatePoint })
}

export const getAllUpdatePoints = async (req, res) => {
    const updates = await prisma.update.findMany({
        where: {
            id: req.body.updateId
        },
        include: {
            updatePoints: true
        }
    })

    const updatePoints = updates.reduce((allUpdatePoints, update) => {
        return [...allUpdatePoints, ...update.updatePoints]
    }, [])

    res.json({ data: updatePoints })
}

export const createUpdatePoint = async (req, res) => {
    const update = await prisma.update.findUnique({
        where: {
            id: req.body.updateId
        }
    })

    if (!update) {
        return res.json({ message: 'No update found' })
    }

    const updatePoint = await prisma.updatePoint.create({
        data: {
            title: req.body.title,
            description: req.body.description,
            update: { connect: update }
        }
    })

    res.json({ data: updatePoint })
}

export const updateUpdatePoint = async (req, res) => {
    const userProduct = await prisma.product.findUnique({
        where: {
            belongsToId: req.user.id,
            id: req.body.productId
        }
    })

    if (!userProduct) {
        return res.json({ message: "Unauthorized" })
    }

    const updates = await prisma.update.findMany({
        where: {
            productId: req.body.productId
        },
        include: {
            updatePoints: true
        }
    })

    const updatePoints = updates.reduce((allUpdatePoints, update) => {
        return [...allUpdatePoints, ...update.updatePoints]
    }, [])

    const match = updatePoints.find(updatePoint => updatePoint.id === req.params.id)

    if (!match) {
        // Handle this.
        return res.json({ message: "Nope" })
    }

    const updatedUpdatePoint = await prisma.updatePoint.update({
        where: {
            id: req.params.id
        },
        data: {
            title: req.body.title,
            description: req.body.description,
        }
    })

    res.json({ data: updatedUpdatePoint })
}

export const deleteUpdatePoint = async (req, res) => {
    const userProduct = await prisma.product.findUnique({
        where: {
            belongsToId: req.user.id,
            id: req.body.productId
        }
    })

    if (!userProduct) {
        return res.json({ message: "Unauthorized" })
    }

    const updates = await prisma.update.findMany({
        where: {
            productId: req.body.productId
        },
        include: {
            updatePoints: true
        }
    })

    const updatePoints = updates.reduce((allUpdatePoints, update) => {
        return [...allUpdatePoints, ...update.updatePoints]
    }, [])

    const match = updatePoints.find(updatePoint => updatePoint.id === req.params.id)

    if (!match) {
        // Handle this.
        return res.json({ message: "Nope" })
    }

    const deleted = await prisma.updatePoint.delete({
        where: {
            id: req.params.id
        }
    })

    res.json({ data: deleted })
}