class ExamesController < ApplicationController
  def index
    @exames = Exame.all
  end
end
