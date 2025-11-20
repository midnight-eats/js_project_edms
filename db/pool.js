const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('db', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
});

const Position = sequelize.define("positions", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: 'Position name cannot be empty'
      }
    }
  }
}, {
    timestamps: false
});

const Category = sequelize.define("categories", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: 'Categoty name cannot be empty'
      }
    }
  }
}, {
    timestamps: false
});

const Role = sequelize.define("roles", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: 'Role name cannot be empty'
      }
    }
  }
}, {
    timestamps: false
});

const User = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  first_name: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'User first name cannot be empty'
      }
    }
  },
  last_name: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'User last name cannot be empty'
      }
    }
  },
  email: {
    type: Sequelize.STRING(100),
    validate: {
      is: /^[A-Za-z0-9._+-]+@[A-Za-z0-9._]+\.[A-Za-z]{2,}$/i,
    },
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING(100),
    validate: {
      is: /^[A-Za-z0-9]{8,}$/i,
    },
    allowNull: false
  }
}, {
    updatedAt: false
});

User.belongsTo(Role);
User.belongsTo(Position);

Role.hasMany(User);
Position.hasMany(User);

sequelize.sync().then(result => {
  console.log(result);
})
.catch(err => console.log(err));

module.exports = {
  sequelize,
  User,
  Role,
  Position,
  Category
};