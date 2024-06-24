interface Props {
  title: string
  subTitle?: string
  className?: string //Will be set to the <div> parent container
}

export const TitleAdmin = ({ title, subTitle, className = '' }: Props) => {
  return (
    <div className={`admin-title-banner title-italic ${className}`}>
      <h1 className={``} dangerouslySetInnerHTML={{__html: title}}/>
      {subTitle && <h3 className={``}>{subTitle}</h3>}
    </div>
  )
}
