require('dotenv').config()

exports.bundles = {
  // dryrun: true,
  srcPath: 'dist',
  s3Path:
    process.env.NODE_ENV === 'staging'
      ? `${process.env.CDN_BUCKET_STA}/${process.env.CDN_APP_FOLDER}/bundles/`
      : `${process.env.CDN_BUCKET_PRO}/${process.env.CDN_APP_FOLDER}/bundles/`,
  excludes: ['*.html']
}

exports.template = {
  // dryrun: true,
  srcPath: 'dist',
  s3Path:
    process.env.NODE_ENV === 'staging'
      ? `${process.env.CDN_BUCKET_STA}/${process.env.CDN_APP_FOLDER}/pre-renders/`
      : `${process.env.CDN_BUCKET_PRO}/${process.env.CDN_APP_FOLDER}/pre-renders/`,
  excludes: ['*.js']
}

exports.invalidate = {
  id:
    process.env.NODE_ENV === 'staging'
      ? process.env.CDN_ID_STA
      : process.env.CDN_ID_PRO,
  paths: '/*'
}

exports.clear = {
  // dryrun: false,
  keyPath:
    process.env.NODE_ENV === 'staging'
      ? `${process.env.CDN_BUCKET_STA}/${process.env.CDN_APP_FOLDER}`
      : `${process.env.CDN_BUCKET_PRO}/${process.env.CDN_APP_FOLDER}`
}
