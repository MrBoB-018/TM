import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";

export const getTasks = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const userId = req.user!.id;

    const whereClause: any = {
      userId,
      status: status ? (status as string) : undefined,
      title: search
        ? { contains: search as string, mode: "insensitive" }
        : undefined,
    };

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where: whereClause,
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        orderBy: { createdAt: "desc" },
      }),
      prisma.task.count({ where: whereClause }),
    ]);

    res.json({ data: tasks, total });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description } = req.body;
    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: req.user!.id,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: req.params.id },
    });
    if (!task || task.userId !== req.user!.id)
      return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, status } = req.body;
    const task = await prisma.task.findUnique({
      where: { id: req.params.id },
    });
    if (!task || task.userId !== req.user!.id)
      return res.status(404).json({ message: "Task not found" });

    const updated = await prisma.task.update({
      where: { id: task.id },
      data: {
        title: title ?? task.title,
        description: description ?? task.description,
        status: status ?? task.status,
      },
    });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: req.params.id },
    });
    if (!task || task.userId !== req.user!.id)
      return res.status(404).json({ message: "Task not found" });

    await prisma.task.delete({ where: { id: task.id } });
    res.json({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};

export const toggleTask = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: req.params.id },
    });

    if (!task || task.userId !== req.user!.id)
      return res.status(404).json({ message: "Task not found" });

    const updated = await prisma.task.update({
      where: { id: task.id },
      data: {
        status: task.status === "PENDING" ? "COMPLETED" : "PENDING",
      },
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
};
