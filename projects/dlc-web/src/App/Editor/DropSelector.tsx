import { makeStyles } from '@material-ui/core/styles'
import GetAppIcon from '@material-ui/icons/GetApp'
import clsx from 'clsx'
import path from 'path'
import React, { useState } from 'react'
import { FileUpload } from '../../interfaces'

const useStyles = makeStyles(theme => ({
  dropContainer: {
    ...theme.custom.setFlex('column'),
    width: 200,
    height: 200,
    borderRadius: theme.custom.setSpace() / 4,
    backgroundColor: theme.palette.grey[500],
    transition: 'all 250ms linear'
  },
  dragColor: {
    backgroundColor: theme.palette.primary.main
  },
  dropIcon: {
    color: theme.palette.grey[50],
    fontSize: theme.typography.fontSize * 5
  }
}))

interface Props {
  setSelectedFileHandler: (file: FileUpload) => void
}

export const DropSelector: React.FC<Props> = ({
  setSelectedFileHandler
}): JSX.Element => {
  const classes = useStyles()

  const [dragCount, setDragCount] = useState<number>(0)

  const dragEnterHandler = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
    setDragCount(dragCount + 1)
  }

  const dragLeaveHandler = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
    setDragCount(dragCount - 1)
  }

  const dragOverHandler = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
  }

  const dropHandler = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
    const item = event.dataTransfer.items[0]
    if (item.kind === 'file') {
      const file = item.getAsFile()
      const fileExt = path.extname(file.name).toLowerCase()
      if (process.env.ACCEPTED_FILETYPES.split(',').includes(fileExt))
        setSelectedFileHandler(file)
    }
    setDragCount(0)
  }

  return (
    <div
      id="target"
      className={clsx(classes.dropContainer, {
        [classes.dragColor]: dragCount > 0
      })}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragOverHandler}
      onDrop={dropHandler}>
      <GetAppIcon id="icon" className={classes.dropIcon} />
    </div>
  )
}
