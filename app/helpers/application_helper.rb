module ApplicationHelper

  CAP_TO_DESCRIPTIONS = {
    'accountNavigation' => 'Account Navigation',
    'courseNavigation' => 'Course Navigation',
    'assignmentSelection' => 'Assignment Selection',
    'linkSelection' => 'Link Selection'
  }

  def display_cap(cap)
    if CAP_TO_DESCRIPTIONS.keys.include? cap
      CAP_TO_DESCRIPTIONS[cap]
    else
      cap
    end
  end

end
