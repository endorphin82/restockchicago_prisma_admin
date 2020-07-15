import React from 'react'

const ImageCard = (props) => {
  return (
    <div className="ant-upload-list ant-upload-list-picture">
      <div className="ant-upload-list-item ant-upload-list-item-undefined ant-upload-list-item-list-type-picture">
        <div className="ant-upload-list-item-info">
          <span>
        <a className="ant-upload-list-item-thumbnail" href="#"
           target="_blank" rel="noopener noreferrer"><img
          src={props?.src}
          alt="logo.png" className="ant-upload-list-item-image"/></a>
        <span
          className="ant-upload-list-item-name ant-upload-list-item-name-icon-count-1"
          title="logo.png">logo.png</span><span className="ant-upload-list-item-card-actions picture">
        <button
          title="Remove file" type="button"
          className="ant-btn ant-upload-list-item-card-actions-btn ant-btn-text ant-btn-sm ant-btn-icon-only">
          <span
            role="img" aria-label="delete" className="anticon anticon-delete"><svg
            viewBox="64 64 896 896"
            focusable="false"
            className=""
            data-icon="delete"
            width="1em" height="1em"
            fill="currentColor"
            aria-hidden="true"><path
            d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path></svg>
        </span>
        </button>
          </span>
        </span>
        </div>
      </div>
    </div>
  )
}

export default ImageCard
