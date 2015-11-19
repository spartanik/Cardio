var app = angular.module('starter.directives', []);


app.directive('quiz', function(quizFactory, $timeout) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'templates/quiz.html',
		link: function(scope, elem, attrs) {
			var selected;
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.getQuestion();
			};
 
			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			}
 
			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id);
				if(q) {
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.answerMode = true;
				} else {
					scope.quizOver = true;
				}
			};
 
			scope.checkAnswer = function() {
				if(!$('button[name=selected]').length) return;
				var selected = $('button[name=selected]');
				var ans = selected.val();

				
				if(ans == scope.options[scope.answer]) {
					scope.score++;
					scope.correctAns = true;
					$(selected).addClass('button-balanced animated bounce');
				} else {
					scope.correctAns = false;
					$(selected).addClass('button-assertive animated shake');
				}
 
				scope.answerMode = false;
				$timeout( function(){ scope.nextQuestion(); }, 2000);
			};
 
			scope.nextQuestion = function() {
				scope.id++;
				scope.getQuestion();
			}
 
			scope.reset();
		}
	}
});


app.directive("calendar", function() {
    return {
        restrict: "E",
        templateUrl: "templates/calendar.html",
        scope: {
            selected: "="
        },
        link: function(scope) {
            scope.selected = _removeTime(scope.selected || moment());
            scope.month = scope.selected.clone();

            var start = scope.selected.clone();
            start.date(1);
            _removeTime(start.day(0));

            _buildMonth(scope, start, scope.month);

            scope.select = function(day) {
                scope.selected = day.date;  
            };

            scope.next = function() {
                var next = scope.month.clone();
                _removeTime(next.month(next.month()+1).date(1));
                scope.month.month(scope.month.month()+1);
                _buildMonth(scope, next, scope.month);
            };

            scope.previous = function() {
                var previous = scope.month.clone();
                _removeTime(previous.month(previous.month()-1).date(1));
                scope.month.month(scope.month.month()-1);
                _buildMonth(scope, previous, scope.month);
            };
        }
    };

    function _removeTime(date) {
        return date.day(0).hour(0).minute(0).second(0).millisecond(0);
    }

    function _buildMonth(scope, start, month) {
        scope.weeks = [];
        var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
        while (!done) {
            scope.weeks.push({ days: _buildWeek(date.clone(), month) });
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }
    }

    function _buildWeek(date, month) {
        var days = [];
        for (var i = 0; i < 7; i++) {
            days.push({
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date
            });
            date = date.clone();
            date.add(1, "d");
        }
        return days;
    }
});