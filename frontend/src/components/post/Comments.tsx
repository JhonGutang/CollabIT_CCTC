<AvatarWithContents
  size={50}
  avatarLink={comment.avatarLink}
  name={comment.username}
  isEditing={editingCommentId === comment.id}
  content={comment.content}
  id={comment.id}
  onMenuOpen={onMenuOpen}
/> 